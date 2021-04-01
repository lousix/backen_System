package backen.service;

import backen.entity.SecurityServiceEntity;

import java.util.List;

public interface ISecurityServiceService {
    /**
     * 获取 SecurityService 信息
     * @param
     * @return
     */
    List<SecurityServiceEntity> selectAll();

}
