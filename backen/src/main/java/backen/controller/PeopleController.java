package backen.controller;

import backen.base.BaseController;
import backen.entity.StudentEntity;
import backen.entity.TeacherEntity;
import backen.service.IStudentService;
import backen.service.ITeacherService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author 刘智扬
 */
@Slf4j
@RestController
@RequestMapping(value = {"/people","/api/people"})
public class PeopleController extends BaseController {

    private IStudentService studentService;
    private ITeacherService teacherService;

    @Autowired
    public PeopleController(IStudentService studentService,ITeacherService teacherService){
        this.studentService = studentService;
        this.teacherService = teacherService;
    }


    @GetMapping("/selectAllStudent")
    public Object selectAllStudent(){
        try{
            return response(200,studentService.selectAll());
        }catch (Exception e){
            return response(1002,null);
        }
    }

    @GetMapping("/selectAllTeacher")
    public Object selectAllTeacher(){
        try{
            return response(200,teacherService.selectAll());
        }catch (Exception e){
            return response(1002,null);
        }
    }

    @GetMapping("/selectById")
    public Object selectById(@RequestParam("id") String id){
        try{
            return response(200,studentService.selectById(id));
        }catch (Exception e){
            return response(1002,null);
        }
    }

    @GetMapping("getById")
    public Object getById(@RequestParam("id") String id){
        try{
            return response(200,teacherService.getById(id));
        }catch (Exception e){
            return response(1002,null);
        }
    }
}
