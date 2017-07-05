package com.khaojie.design.config;

import com.mchange.v2.c3p0.ComboPooledDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.JpaVendorAdapter;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.Database;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.sql.DataSource;

/**
 * Created by khaojie on 2017/6/26.
 */
@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(basePackages = "com.khaojie.repository", entityManagerFactoryRef = "entityManagerFactory")
public class JDBCConfig {

    @Bean(destroyMethod="close")
    @ConfigurationProperties("datasource")
    public DataSource dataSource() {
        return new ComboPooledDataSource();
    }

    @Bean
    public LocalContainerEntityManagerFactoryBean entityManagerFactory(EntityManagerFactoryBuilder builder) {
        LocalContainerEntityManagerFactoryBean lcm =  builder
                .dataSource(dataSource())
                .packages("com.khaojie.pojo")
                .persistenceUnit("model_factory")
                .build();
        lcm.setJpaVendorAdapter(hibernateJpaVendorAdapter());
        return lcm;
    }

    @Bean
    @ConfigurationProperties("customjpa")
    public JpaVendorAdapter hibernateJpaVendorAdapter() {
        return new HibernateJpaVendorAdapter();
    }

//    @Bean
//    public JpaTransactionManager transactionManager(){
//        JpaTransactionManager tm = new JpaTransactionManager();
//        tm.setEntityManagerFactory();
//    }
}
