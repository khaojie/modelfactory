package com.khaojie.modelfactory.web.controller;

/**
 * Created by khaojie on 2017/6/24.
 */
class Book{
    Boolean checkOut = false;
    Book(Boolean checkOut){
        this.checkOut = checkOut;
    }
    void checkIn(){
        checkOut=false;
    }

    @Override
    protected void finalize() throws Throwable {
        if(checkOut)
            System.out.println("Error ,pleas checkout");
        else
            super.finalize();
    }
}
public class TestClass {
    public static void main(String[] args) {
        Book novel = new Book(true);
        novel.checkIn();
        Book novel1 = new Book(true);
        novel1.checkIn();
        System.gc();
    }
}
