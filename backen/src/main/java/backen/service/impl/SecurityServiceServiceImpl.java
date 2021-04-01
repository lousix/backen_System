package backen.service.impl;

import backen.entity.SecurityServiceEntity;
import backen.repository.SecurityServiceRepository;
import backen.service.ISecurityServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


/**
 * @author 刘智扬
 */
@Service
public class SecurityServiceServiceImpl implements ISecurityServiceService {

    private SecurityServiceRepository securityServiceRepository;

    @Autowired
    public SecurityServiceServiceImpl(SecurityServiceRepository securityServiceRepository){
        this.securityServiceRepository = securityServiceRepository;
    }

    @Override
    public List<SecurityServiceEntity> selectAll() {
        return securityServiceRepository.findAll();
    }
}
