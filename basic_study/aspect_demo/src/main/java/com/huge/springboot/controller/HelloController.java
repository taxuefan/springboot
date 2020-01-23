package com.huge.springboot.controller;


import org.springframework.web.bind.annotation.*;
/**/
import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/test")
public class HelloController {

    @GetMapping(value = "/getName")
    public String getName(@RequestParam("name") String name) {
        return "姓名是" + name;
    }

    @GetMapping(value = "/getUser/{id}")
    public Map getUser(@PathVariable("id") String id) {
        Map<String, String> map = new HashMap<>();
        map.put("name", "小小");
        map.put("id", id);
        return map;
    }

    @GetMapping
    public int getAge(@RequestParam("id") String id) {
        if (id.equals("1")) {
            throw new NullPointerException();
        }
        return 18;
    }
}
