package backen.base;

import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashMap;
import java.util.Map;

/**
 * @author: 刘智扬
 */
public class BaseController{

    @Autowired
    private ResponseCode responseCode;

    public Map<String, Object> response(int code, Object o) {
        Map<String, Object> result = new HashMap<>();
        result.put("code", code);
        result.put("data", o);
        result.put("success", code == 200 ? true : false);
        result.put("msg", code == 200 ? "成功" : responseCode.getResponseMsg(code));
        return result;
    }




}
