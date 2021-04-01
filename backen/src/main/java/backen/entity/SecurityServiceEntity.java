package backen.entity;


import lombok.Data;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

/**
 * @author 刘智扬
 */
@Data
@Entity
@Table(name = "security_service")
@SQLDelete(sql="update teacher set is_delete = 1 where id = ?")
@Where(clause = "is_delete = 0")
public class SecurityServiceEntity implements Serializable {

    @Id
    @Column(name = "id")
    private String id;

    @Column(name = "pic_path")
    private String pic_path;

    @Column(name = "description")
    private String description;

    @Column(name = "link")
    private String link;

}
