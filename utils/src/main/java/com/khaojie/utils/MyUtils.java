package com.khaojie.utils;

import java.lang.reflect.Array;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.*;

/**
 * Created by khaojie on 2017/6/30.
 */
public class MyUtils {
    public static boolean isEmpty(Object obj)
    {
        if (obj == null) {
            return true;
        }
        if (obj.getClass().isArray()) {
            return Array.getLength(obj) == 0;
        }
        if ((obj instanceof CharSequence)) {
            return ((CharSequence)obj).length() == 0;
        }
        if ((obj instanceof Collection)) {
            return ((Collection)obj).isEmpty();
        }
        if ((obj instanceof Map)) {
            return ((Map)obj).isEmpty();
        }
        return false;
    }

    public static boolean isNotEmpty(Object obj)
    {
        return !isEmpty(obj);
    }

    public static <T> List<Long> getIds(String prop, List<T> ts)
    {
        List<Long> list = new ArrayList();
        if ((MyUtils.isNotEmpty(ts)) && (MyUtils.isNotEmpty(prop))) {
            for (T t : ts) {
                try
                {
                    Field fd = t.getClass().getDeclaredField(prop);
                    if (fd.getType() == Long.class)
                    {
                        Method m = t.getClass().getDeclaredMethod(
                                "get" + prop.toUpperCase().charAt(0) +
                                        prop.substring(1), null);
                        list.add((Long)m.invoke(t, null));
                    }
                }
                catch (Exception e)
                {
                    e.printStackTrace();
                }
            }
        }
        return list;
    }

    public static String generateUUID()
    {
        return UUID.randomUUID().toString();
    }
}
