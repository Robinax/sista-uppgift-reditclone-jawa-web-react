package com.example.webjavafinish.posts;
+import com.example.springredditclone.Users.UserRepository;
import com.example.springredditclone.Users.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.Collection;

@RestController
@RequestMapping("/posts")
public class PostController {
    @Autowired
    PostsService postsService;

    @Autowired
    UserService userService;

    @Autowired
    UserRepository userRepository;

    @CrossOrigin
    @GetMapping("/all")
    public Collection<Posts> getPosts(HttpServletResponse response) {

        return postsService.getPosts();
    }
    @CrossOrigin
    @PutMapping("/create")
    public String createProduct(@RequestHeader("token") String token, @RequestBody Posts posts, HttpServletResponse response) {
        if (userService.validate(token) == null) {
            response.setStatus(401);
            return null;
        }

        int result = postsService.createPosts(posts);
        switch (result) {
            case 1:
                response.setStatus(409);
                return "There is already a product with that name";
            case 0:
                return "Product has been created";
            default:
                response.setStatus(500);
                return "Something went wrong.";
        }
    }
    @CrossOrigin
    @DeleteMapping("/delete/{postTitle}")
    public String deletePost(@PathVariable("postTitle") String postTitle, @RequestHeader("username") String name,  HttpServletResponse response) {

        if (!postsService.deletePost(postTitle)) {
            response.setStatus(404);
            return "There is no post named '" + postTitle + "'";
        }

        return "You have deleted '" + postTitle + "'";
    }

}