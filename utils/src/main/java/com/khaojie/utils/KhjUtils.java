package com.khaojie.utils;

import java.lang.reflect.Array;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by khaojie on 2017/6/30.
 */
public class KhjUtils {
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
        if ((KhjUtils.isNotEmpty(ts)) && (KhjUtils.isNotEmpty(prop))) {
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


    public static Boolean matchRegx(String regEx,String str){
        Pattern pattern = Pattern.compile(regEx);
        Matcher matcher = pattern.matcher(str);
        return matcher.matches();
    }

    public static String getZiMu(String str){
        Pattern p = Pattern.compile("[^A-Z]");
        Matcher m = p.matcher(str);
        return m.replaceAll("").trim();
    }

    public static String getNumber(String str){
        Pattern p = Pattern.compile("[^0-9]");
        Matcher m = p.matcher(str);
        return m.replaceAll("").trim();
    }
}
