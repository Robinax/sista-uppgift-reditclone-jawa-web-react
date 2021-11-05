package com.example.webjavafinish.user;

import com.example.webjavafinish.posts.Posts;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;
@Data
public class User {

    private String name, password;
    private List<Posts> favorites;

    public User(String name, String password) {
        this.name = name;
        this.password = password;
        this.favorites = new ArrayList<>();
    }

}
