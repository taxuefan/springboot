
package com.huge.springboot.interceptor;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
     * xuhaixing
     * 2018/5/30 8:57
     */
    @Component
    public class MyInterceptor implements HandlerInterceptor {


        public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
            System.out.println("preHandle" + request.getRequestURL().toString());
            return true; //返回false结束当前请求，返回true继续向下执行
        }

        @Override
        public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) {
            System.out.println("postHandle");

        }

        @Override
        public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) {
            System.out.println("afterCompletion");
        }
    }


