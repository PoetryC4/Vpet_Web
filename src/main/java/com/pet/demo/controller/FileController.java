package com.pet.demo.controller;


import com.pet.demo.common.R;
import com.pet.demo.entity.FileImgsVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.pet.demo.util.FileUtils.listFilesInFolder;

@Slf4j
@RestController
@CrossOrigin
@RequestMapping("/getImgs")
public class FileController {

    @CrossOrigin
    @PostMapping("/dir")
    public R<Object> getDirImgs(@RequestBody FileImgsVO fileImgs) {//E:\vup\Default\Happy\1
        String dirPath = fileImgs.getDirPath();
        String dirSuffix = fileImgs.getDirSuffix();

        if (dirPath == null) return R.error("err");

        dirPath = dirPath.replace("ATslash;", "\\");
        dirSuffix = dirSuffix.replace("ATslash;", "\\");

        List<String> fileList = listFilesInFolder(dirPath, dirSuffix);
        //System.out.println(fileList);

        if (fileList != null) {
            return R.success(fileList);
        } else {
            return R.error("指定路径不是有效的文件夹");
        }
    }
}
