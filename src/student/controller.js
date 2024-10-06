const pool = require('../../db');
const queries = require('./queries');

const getStudents = async (req, res) => {
    try {
        const results = await pool.query(queries.getStudents); 
        res.status(200).json(results.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const getStudentById = (req,res)=>{
    const id = parseInt(req.params.id);
    pool.query(queries.getStudentById,[id],(error,results)=>{
        if(error) throw error;
        res.status(200).json(results.rows);
    })
}



const insertStudent = (req,res)=>{
    const { name,email,age,dob } = req.body;


    pool.query(queries.checkEmailExists,[email],(error,results)=>{
        if(results.rows.length){
            return res.send("Email is already exists.");

        }

        //add student to db
        pool.query(queries.insertStudent,[name,email,age,dob],(error,results)=>{
            if(error) throw error;
            res.status(201).send("Student has been created succesfully!");
           
        });


    });

}


const removeStudent = (req,res)=>{
    const id = parseInt(req.params.id);
    pool.query(queries.getStudentById,[id],(error,results)=>{
        const noStudentFound = !results.rows.length;
        if(noStudentFound){
            res.send("Student does not exist.");
        }

        pool.query(queries.removeStudent,[id],(error,results)=>{
            if(error) throw error;
            res.status(200).send("Student removed.");
        })
    })                       
}


const updateStudent = (req,res)=>{
    const id = parseInt(req.params.id);
    const { name } = req.body;

    pool.query(queries.getStudentById,[id],(error,results)=>{
        const noStudentFound = !results.rows.length;
        if(noStudentFound){
            res.send("Student does not exist.");
        }

        pool.query(queries.updateStudent,[name,id],(error,results)=>{
            if(error) throw error;
            res.status(200).send("Student updated.");
        });
    
    })
}









module.exports = {
    getStudents,
    getStudentById,
    insertStudent,
    removeStudent,
    updateStudent,
}
