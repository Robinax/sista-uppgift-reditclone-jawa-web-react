package com.example.webjavafinish.posts;

import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

@Repository
public class PostsRepository {

    private Map<String, Posts> posts = new HashMap<>();

    public Posts get(String title) {
        return posts.get(title.toLowerCase());
    }

    public void save(Posts post) {posts.put(post.getTitle().toLowerCase(), post);}

    public void removePost(String title){
        posts.remove(title.toLowerCase());
    }

    public Collection<Posts> getPosts() {
        return posts.values();
    }

    public Posts getPost(String title){
        return posts.get(title.toLowerCase());
    }

}