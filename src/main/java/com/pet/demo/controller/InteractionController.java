package com.pet.demo.controller;


import com.pet.demo.common.R;
import com.pet.demo.entity.ChatGLMVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
@CrossOrigin
@RequestMapping("/interaction")
public class InteractionController {

    @CrossOrigin
    @PostMapping("/chat")
    public R<Object> getDirImgs(@RequestBody ChatGLMVO chatGLMVO) {

        List<String> names = new ArrayList<>();
        List<Object> values = new ArrayList<>();
        names.add("question");
        names.add("history");
        names.add("streaming");
        values.add(chatGLMVO.getQuestion());
        values.add(chatGLMVO.getHistory());
        values.add(chatGLMVO.getStreaming());
        /*String output = null;
        Map map1 = null;

        try {
            output = RequestWithBody("http","127.0.0.1","7891","chat",names,values);
            map1 = JSON.parseObject(output, Map.class);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        if(output == null) {
            return R.error("err");
        }
        return R.success(map1.get("response"));*/
        return R.success("sadukofh"+Math.random());
    }
}
