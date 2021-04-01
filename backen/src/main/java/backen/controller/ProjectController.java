package backen.controller;

import backen.base.BaseController;
import backen.service.IProjectService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author 刘智扬
 */
@Slf4j
@RestController
@RequestMapping(value = {"/project","/api/project"})
public class ProjectController extends BaseController {

    private IProjectService projectService;

    @Autowired
    public ProjectController(IProjectService projectService){
        this.projectService = projectService;
    }

    @GetMapping("/getAllProject")
    public Object getAllEngineeringProject(){
        try{
            return response(200,projectService.selectAll());
        }catch(Exception e){
            return response(1002,null);
        }
    }

    @GetMapping("/getById")
    public Object getById(@RequestParam("id") String id){
        try{
            return response(200,projectService.getById(id));
        }catch (Exception e){
            return response(1002,null);
        }
    }

}
