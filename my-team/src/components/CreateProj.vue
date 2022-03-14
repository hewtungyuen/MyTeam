<template>
  <div id = "body">
    <h1 id = "heading"> Create a new project </h1>
    <div id = "proj_name">
        <form>
        <label for="name" >Project Name: </label> <br><br>
        <input type="text" id="name" required="" size = "50"> <br><br><br>
        <label for="details">Project Details: </label> <br><br>
        <textarea id="details" name="details" rows="4" cols="50"></textarea>
        </form>
    </div>
    <div id = "add_member">
        <form>
            <label for="add" >Add New Members: </label> <br><br>
            <input type="email" id="add" required="" size = "40">
            <button id = 'add_new' round>
                +
            </button> <br><br><br>
            <label for="members">Team Members: </label> <br><br>
            <textarea id="members" name="members" rows="4" cols="50"></textarea>
        </form>
    </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>
#body{
            position:fixed;
            margin: 35px;
            font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        }
        #heading{
        margin-left: 550px
        /* Add a new project */
        }
        #proj_name{
            margin-top: 50px;
            margin-left: 60px;
            display:inline-block;
        }
        #add_member{
            margin-top:50px;
            margin-left: 60px;
            display: inline-block;
            
        }
        form{
            font-size: 24px;

        }
        input, textarea{
            border: 1px solid black;
            font-size: 20px;
            font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        }


</style>