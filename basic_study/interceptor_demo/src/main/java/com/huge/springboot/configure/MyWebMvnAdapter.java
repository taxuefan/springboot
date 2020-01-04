package com.huge.springboot.configure;

import com.huge.springboot.interceptor.MyInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * xuhaixing
 * 2018/5/30 9:03
 */
@Configuration
public class MyWebMvnAdapter implements WebMvcConfigurer { //WebMvcConfigurerAdapter已经过时

    @Autowired
    private MyInterceptor myInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(myInterceptor).addPathPatterns("/hello").addPathPatterns("/**");
    }
}
