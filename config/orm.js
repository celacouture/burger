//mysql connection
var connection=require('../config/connection')

//methods for connecting to mysql commands for retrieving and storing data in the database
//select all, insert one, update one, delete

//helper function for sql syntax, the below function loops through and creates and array of question marks

function printQuestionMarks(num){
  var arr[];

  for(var i=0; i<num; i++){
    arr.push("?");
  }
  return arr.toString();
}

//helper function to convert object key/value pairs to sql syntax

function objToSql(ob){
  var arr=[];

  //loop throught the keys and push the key/value as a string into array
  for(var key in ob){
    var value=ob[key];
    //skip hidden properties
    if(Object.hasOwnProperty.call(ob, key)){
      //strings with space go beteween quotations
      if(typeof value==='string' && value.indexOf(" ") >=0){
        value="'" +value+ "'";
      }
      // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
      // e.g. {sleepy: true} => ["sleepy=true"]
      arr.push(key+ "=" + value);
    }
  }
  //convert array of strings to single comma separated string
  return arr.toString();
}
//object for all our sql function statements
var orm={
  all:function(tableInput, cb){
    var queryString="SELECT * FROM " +tableInput+";";
    connection.query(queryString, function(err, result){
      if(err){
        throw err;
      }
      cb(result);
    });
  },

  create:function(table, cols, vals, cb){
    var queryString="INSERT INTO " +table;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";

    console.log(queryString);

    connection.query(queryString, vals, function(err, result){
      if(err){
        throw err;
      }

      cb(result);
    });
  },

  update:function(table, objColVals, condition, cb){
    var queryString="UPDATE " + table;

    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);
    connection.query(queryString, function(err, result){
      if(err){
        throw err;
      }
      cb(result);
    });
  },

  delete:function(table, condition, cb){
    var queryString="DELETE FROM " +table;
    queryString += 'WHERE ';
    queryString += condition;

    connection.query(queryString, function(err, result){
      if(err){
        throw err;
      }
      cb(result);
    });
  }
};



//export orm object to burger.js

module.exports=orm;
