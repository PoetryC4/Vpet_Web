package com.pet.demo.controller;


import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.pet.demo.common.R;
import com.pet.demo.entity.Present;
import com.pet.demo.entity.PageVO;
import com.pet.demo.service.PresentService;
import com.pet.demo.service.PresentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/present")
public class PresentController {

    @Autowired
    private PresentService presentService;


    @PostMapping("/save")
    public R<String> addPresent(@RequestBody Present present) {

        if(presentService.save(present))
            return R.success("Y");

        return R.error("N");
    }

    @PostMapping("/page")
    public R<Object> getPresent(@RequestBody PageVO pageVO) {

        //构造分页构造器
        Page pageInfo = new Page(pageVO.getPage(), pageVO.getPageSize());

        //构造条件构造器
        LambdaQueryWrapper<Present> queryWrapper = new LambdaQueryWrapper();
        //添加排序条件
        queryWrapper.orderByAsc(Present::getPresentId);

        //执行查询
        IPage pageRes = presentService.page(pageInfo,queryWrapper);

        //List<Present> PresentRes = pageRes.getRecords();

        return R.success(pageRes);

    }

}
