package com.pet.demo.util;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

public class FileUtils {

    private static void listFilesHelper(String dirPath, String dirSuffix, List<String> fileNames) {
        File folder = new File(dirPath);
        File[] files = folder.listFiles();
        for (int i = 0; i < files.length; i++) {
            if(files[i].isDirectory()) {
                listFilesHelper(dirPath+ "/" + files[i].getName(),dirSuffix+"/" + files[i].getName(), fileNames);
            } else {
                fileNames.add("http://127.0.0.1:8011/front" + dirSuffix + "/" + files[i].getName());
            }
        }
    }

    public static List<String> listFilesInFolder(String dirPath, String dirSuffix) {
        File folder = new File(dirPath);
        if(!folder.exists() || !folder.isDirectory()) {
            return null;
        }
        File[] files = folder.listFiles();
        if (files == null) {
            return null;
        }

        List<String> fileNames = new ArrayList<>();
        for (int i = 0; i < files.length; i++) {
            //System.out.println(files[i].getName());
            if( !files[i].isDirectory()) {
                fileNames.add("http://127.0.0.1:8011/front" + dirSuffix + "/" + files[i].getName());
            } else {
                listFilesHelper(dirPath+ "/" + files[i].getName(),dirSuffix+"/" + files[i].getName(), fileNames);
            }
        }
        return fileNames;
    }
    public static void getFileContent(Object fileInPath) throws IOException {
        BufferedReader br = null;
        if (fileInPath == null) {
            return;
        }
        if (fileInPath instanceof String) {
            br = new BufferedReader(new FileReader(new File((String) fileInPath)));
        } else if (fileInPath instanceof InputStream) {
            br = new BufferedReader(new InputStreamReader((InputStream) fileInPath));
        }
        String line;
        while ((line = br.readLine()) != null) {
            System.out.println(line);
        }
        br.close();
    }
    public void getFilePath(String fileName) throws IOException {
        InputStream in = this.getClass().getResourceAsStream("/" + fileName);
        getFileContent(in);
    }
}
