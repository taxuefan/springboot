package com.huge.springboot.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * xuhaixing
 * 2018/5/30 9:17
 */
@RestController
@RequestMapping("hello")
public class HelloController {

    @RequestMapping(value = "world1",method = RequestMethod.GET)
    public String helloWorld1(){
        return "world1";
    }

    @RequestMapping(value = "world2",method = RequestMethod.POST)
    public String helloWorld2(){
        return "world2";
    }
}
