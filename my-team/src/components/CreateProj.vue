<template>
  <div id = "body">
      <button id = "back" @click = "backHome()"> &#8249; Home </button>
    <h1 id = "heading"> Create a new project </h1>
    <div id = "proj_name">
        <form>
        <label for="name" >Project Name: </label> <br>
        <input type="text" id="name" required="" size = "30"> <br><br>
        <label for="details">Project Details: </label> <br>
        <textarea id="details" name="details" rows="4" cols="40"></textarea>
        </form>
    </div>
    <div id = "add_member">
        <form>
            <label for="add" >Add New Members: </label> <br>
            <input type="email" id="add" required="" placeholder="Enter Email" size = "20">
            <button id = 'add_new' round @click = "addMember()">
                +
            </button> <br><br>
            <label for="members">Team Members: </label> <br>
            <textarea id="members" name="members" rows="4" cols="40"></textarea>
        </form>
    </div>
  <div>
      <button id = "create" round @click = "createProj()"> Create &raquo; </button>
  </div>
    </div>
</template>

<script>
export default {
    methods:{
        backHome(){
            this.$router.push('/HomePage');
        },
        addMember(){
            alert("add member")
        },
        createProj(){
            alert("create")
        }
    }

}
</script>

<style>
#body{
            position:fixed;
            font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        }
        #heading{
        margin-left: 550px;
        
        
        /* Add a new project */
        }
        
        #back{
            margin-left: 100px;
            background-color: #04AA6D;
            color: white;
            padding: 5px;
            font-size: 18px;
            display: inline-block
        }
        #proj_name{
            margin-left: 140px;
            display:inline-block;
        }
        #add_member{
            margin-top:30px;
            margin-left: 90px;
            display: inline-block;
            
        }
        form{
            font-size: 20px;

        }
        input, textarea{
            border: 1px solid black;
            font-size: 20px;
            font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        }
        #add_new{
            border-radius: 40%;
            font-size: 25px;
            position:relative;
            margin-left: 10px;
        }
        #create{
            background-color: #04AA6D;
            color: white;
            padding: 10px;
            font-size: 20px;
            margin-top: 50px;
            margin-left: 1000px
        }
        #create:hover, #back:hover{
            background-color: #ddd;
            color: black;
        }

</style>