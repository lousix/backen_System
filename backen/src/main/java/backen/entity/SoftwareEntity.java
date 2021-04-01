package backen.entity;
import lombok.Data;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.io.Serializable;

/**
 * @author 刘智扬
 */

@Data
@Entity
@Table(name = "software")
@SQLDelete(sql="update software set is_delete = 1 where id = ?")
@Where(clause = "is_delete = 0")
public class SoftwareEntity implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;

    @Column(name = "name")
    private String name;

    @Column(name = "picture")
    private String picture;

    @Column(name = "link")
    private String link;

}
