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
@Table(name = "research")
@SQLDelete(sql="update research set is_delete = 1 where id = ?")
@Where(clause = "is_delete = 0")
public class ResearchEntity implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "picture")
    private String picture;

}
