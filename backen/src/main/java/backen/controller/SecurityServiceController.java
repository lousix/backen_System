package backen.controller;

import backen.base.BaseController;
import backen.service.ISecurityServiceService;
import backen.service.impl.SecurityServiceServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author 刘智扬
 */
@Slf4j
@RestController
@RequestMapping(value = {"/SecurityService","/api/SecurityService"})
public class SecurityServiceController extends BaseController {

    private ISecurityServiceService securityServiceService;

    @Autowired
    public SecurityServiceController(ISecurityServiceService securityServiceService){
        this.securityServiceService = securityServiceService;
    }

    @GetMapping("/getAll")
    public Object getAll(){
        try{
            return response(200,securityServiceService.selectAll());
        }catch (Exception e){
            return response(1002,null);
        }
    }

}
