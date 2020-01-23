package com.huge.springboot.anno;

import java.lang.annotation.*;

/**
 * 定义系统日志注解
 * @author chu
 * @date 2019/6/4 9:24
 * @email 1529949535@qq.com
 */
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface SysLog {
    String value() default "test";

}
