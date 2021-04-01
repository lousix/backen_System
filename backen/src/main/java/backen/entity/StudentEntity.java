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
@Table(name="student")
@SQLDelete(sql="update student set is_delete = 1 where id = ?")
@Where(clause = "is_delete = 0")
public class StudentEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;

    @Column(name = "name")
    private String name;

    @Column(name = "picture")
    private String picture;

    @Column(name = "Email")
    private String Email;

    @Column(name = "education")
    private String education;

    @Column(name = "interests")
    private String interests;

    @Column(name = "degree")
    private String degree;

    @Column(name = "is_alumni")
    private int is_alumni;



}
