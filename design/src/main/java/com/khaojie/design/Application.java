package com.khaojie.design;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

/**
 * Created by admin on 5/17/17.
 */
@SpringBootApplication
@ComponentScan(basePackages = {"com.khaojie"})//,excludeFilters = @ComponentScan.Filter(type = FilterType.ANNOTATION, value = Controller.class)
public class Application  {
    public static void main(String[] args) {
        SpringApplication.run(Application.class,args);
    }
//    @Bean
//    public CommandLineRunner commandLineRunner(ApplicationContext ctx) {
//        return args -> {
//
//            System.out.println("Let's inspect the beans provided by Spring Boot:");
//
//            String[] beanNames = ctx.getBeanDefinitionNames();
//            Arrays.sort(beanNames);
//            for (String beanName : beanNames) {
//                System.out.println(beanName);
//            }
//
//        };
//    }

}
