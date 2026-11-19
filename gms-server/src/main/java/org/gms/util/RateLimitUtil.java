package org.gms.util;

import lombok.extern.slf4j.Slf4j;
import org.gms.manager.ServerManager;
import org.gms.model.pojo.RateLimitContext;
import org.gms.property.ServiceProperty;
import org.gms.server.TimerManager;
import org.gms.service.AccountService;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;

@Slf4j
public class RateLimitUtil {
    private static final long MIN_SWEEP_PERIOD_MILLIS = TimeUnit.MINUTES.toMillis(5);

    private static RateLimitUtil instance;
    private final ServiceProperty.RateLimitProperty rateLimitProperty;
    private final Map<String, RateLimitContext> contextMap;

    private RateLimitUtil() {
        rateLimitProperty = ServerManager.getApplicationContext().getBean(ServiceProperty.class).getRateLimit();
        contextMap = new ConcurrentHashMap<>();
        // 定期清扫过期上下文：限流键是外部可控的IP，不做淘汰会随攻击流量无界增长
        long sweepPeriod = Math.max(MIN_SWEEP_PERIOD_MILLIS, rateLimitProperty.getDuration());
        TimerManager.getInstance().register(this::sweepExpiredContexts, sweepPeriod, sweepPeriod);
    }

    public static RateLimitUtil getInstance() {
        if (instance == null) {
            instance = new RateLimitUtil();
        }
        return instance;
    }

    private void sweepExpiredContexts() {
        try {
            long now = System.currentTimeMillis();
            contextMap.entrySet().removeIf(entry -> {
                Long expire = entry.getValue().getExpire();
                return expire == null || expire < now;
            });
        } catch (Exception e) {
            log.error("Rate limit sweep error", e);
        }
    }

    public boolean check(String ip) {
        if (!rateLimitProperty.isEnabled()) {
            return true;
        }
        try {
            RateLimitContext rateLimitContext = contextMap.get(ip);
            if (rateLimitContext == null) {
                rateLimitContext = new RateLimitContext();
                rateLimitContext.setCurr(new AtomicInteger(1));
                rateLimitContext.setExpire(System.currentTimeMillis() + rateLimitProperty.getDuration());
                contextMap.put(ip, rateLimitContext);
                return true;
            }
            if (rateLimitContext.getExpire() < System.currentTimeMillis()) {
                // 复用同一上下文对象重置窗口，无需重新 put
                rateLimitContext.setExpire(System.currentTimeMillis() + rateLimitProperty.getDuration());
                rateLimitContext.getCurr().set(1);
                return true;
            }
            if (rateLimitContext.getCurr().incrementAndGet() > rateLimitProperty.getLimit()) {
                if (rateLimitProperty.isAutoBan()) {
                    AccountService accountService = ServerManager.getApplicationContext().getBean(AccountService.class);
                    accountService.ban(ip, "Auto banned by rate limit", true);
                }
                return false;
            }
            return true;
        } catch (Exception e) {
            log.error("Rate limit check error", e);
        }
        return false;
    }
}