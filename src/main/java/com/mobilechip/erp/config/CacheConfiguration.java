package com.mobilechip.erp.config;

import io.github.jhipster.config.JHipsterProperties;
import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;
import org.ehcache.expiry.Duration;
import org.ehcache.expiry.Expirations;
import org.ehcache.jsr107.Eh107Configuration;

import java.util.concurrent.TimeUnit;

import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
@AutoConfigureAfter(value = { MetricsConfiguration.class })
@AutoConfigureBefore(value = { WebConfigurer.class, DatabaseConfiguration.class })
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(Expirations.timeToLiveExpiration(Duration.of(ehcache.getTimeToLiveSeconds(), TimeUnit.SECONDS)))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(com.mobilechip.erp.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(com.mobilechip.erp.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(com.mobilechip.erp.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(com.mobilechip.erp.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(com.mobilechip.erp.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(com.mobilechip.erp.domain.Customer.class.getName(), jcacheConfiguration);
            cm.createCache(com.mobilechip.erp.domain.Supplier.class.getName(), jcacheConfiguration);
            cm.createCache(com.mobilechip.erp.domain.ContactPerson.class.getName(), jcacheConfiguration);
            cm.createCache(com.mobilechip.erp.domain.ContactPerson.class.getName() + ".customers", jcacheConfiguration);
            cm.createCache(com.mobilechip.erp.domain.ContactPerson.class.getName() + ".suppliers", jcacheConfiguration);
            cm.createCache(com.mobilechip.erp.domain.Opportunity.class.getName(), jcacheConfiguration);
            cm.createCache(com.mobilechip.erp.domain.Opportunity.class.getName() + ".customers", jcacheConfiguration);
            cm.createCache(com.mobilechip.erp.domain.Opportunity.class.getName() + ".products", jcacheConfiguration);
            cm.createCache(com.mobilechip.erp.domain.CustomerOrder.class.getName(), jcacheConfiguration);
            cm.createCache(com.mobilechip.erp.domain.CustomerOrder.class.getName() + ".customers", jcacheConfiguration);
            cm.createCache(com.mobilechip.erp.domain.PurchaseOrder.class.getName(), jcacheConfiguration);
            cm.createCache(com.mobilechip.erp.domain.PurchaseOrder.class.getName() + ".suppliers", jcacheConfiguration);
            cm.createCache(com.mobilechip.erp.domain.PurchaseOrder.class.getName() + ".contracts", jcacheConfiguration);
            cm.createCache(com.mobilechip.erp.domain.CashFlow.class.getName(), jcacheConfiguration);
            cm.createCache(com.mobilechip.erp.domain.CashFlow.class.getName() + ".purchaseOrders", jcacheConfiguration);
            cm.createCache(com.mobilechip.erp.domain.CashFlow.class.getName() + ".customerOrders", jcacheConfiguration);
            cm.createCache(com.mobilechip.erp.domain.Invoice.class.getName(), jcacheConfiguration);
            cm.createCache(com.mobilechip.erp.domain.Invoice.class.getName() + ".customers", jcacheConfiguration);
            cm.createCache(com.mobilechip.erp.domain.CustomerProposal.class.getName(), jcacheConfiguration);
            cm.createCache(com.mobilechip.erp.domain.CustomerProposal.class.getName() + ".customers", jcacheConfiguration);
            cm.createCache(com.mobilechip.erp.domain.Product.class.getName(), jcacheConfiguration);
            cm.createCache(com.mobilechip.erp.domain.BillOfMaterials.class.getName(), jcacheConfiguration);
            cm.createCache(com.mobilechip.erp.domain.SupplierContract.class.getName(), jcacheConfiguration);
            cm.createCache(com.mobilechip.erp.domain.SupplyPart.class.getName(), jcacheConfiguration);
            cm.createCache(com.mobilechip.erp.domain.SupplyPart.class.getName() + ".boms", jcacheConfiguration);
            cm.createCache(com.mobilechip.erp.domain.SupplyPartContract.class.getName(), jcacheConfiguration);
            cm.createCache(com.mobilechip.erp.domain.SupplyPartContract.class.getName() + ".contracts", jcacheConfiguration);
            cm.createCache(com.mobilechip.erp.domain.PriceRange.class.getName(), jcacheConfiguration);
            cm.createCache(com.mobilechip.erp.domain.ProductStock.class.getName(), jcacheConfiguration);
            cm.createCache(com.mobilechip.erp.domain.ProductStock.class.getName() + ".products", jcacheConfiguration);
            cm.createCache(com.mobilechip.erp.domain.SupplyStock.class.getName(), jcacheConfiguration);
            cm.createCache(com.mobilechip.erp.domain.SupplyStock.class.getName() + ".parts", jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
