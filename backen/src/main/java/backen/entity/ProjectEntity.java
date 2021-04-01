package backen.entity;

import lombok.Data;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * @author 刘智扬
 */
@Data
@Entity
@Table(name = "project")
@SQLDelete(sql = "update project set is_delete = 1 where id = ?")
@Where(clause = "is_delete = 0")
public class ProjectEntity {

    @Id
    @Column(name = "id")
    private String id;

    @Column(name = "name")
    private String name;

    @Column(name = "type")
    private String type;

    @Column(name = "description")
    private String description;
}
