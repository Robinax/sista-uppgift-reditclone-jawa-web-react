package com.example.webjavafinish.posts;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
public class PostsService {

    @Autowired
    PostsRepository postsRepository;

    public int createPosts(Posts posts) {
        Posts existing = postsRepository.get(posts.getTitle());
        if (existing != null)
            return 1;

        postsRepository.save(posts);

        return 0;
    }

    public Collection<Posts> getPosts() {
        return postsRepository.getPosts();
    }


    public boolean deletePost(String postTitle) {
        if (postsRepository.getPost(postTitle) == null)
            return false;

        postsRepository.removePost(postTitle);
        return true;
    }
}