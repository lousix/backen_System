package backen.base;

import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.HashMap;
import java.util.Map;

/**
 * @author: 刘智扬
 */
@Component
public class ResponseCode {

    private static final Map<Integer, String> responseCode = new HashMap<>();


    public ResponseCode() {
    }

    @PostConstruct
    public void init() {
        responseCode.put(200, "成功");
        responseCode.put(1001, "输入有误");
        responseCode.put(1002, "sql操作失败");
    }

    public String getResponseMsg(int code) {
        return responseCode.get(code);
    }
}
