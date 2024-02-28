<template>
   <div class="Aboutpage overflow-hidden">
    <div class="row">
      <img src="https://iili.io/JMHWh3G.md.webp" id="aboutImg" alt="aboutImg">
      <div>
        <h2 class="display-2" id="Aboutpage1">About</h2>
      </div>
    </div>
    <div class="flex-container">
      <div class="paragraph-container">
        <p class="container text-dark" id="paraBout">
        <span>N</span>atura prides themselves to growing their own food freshly from the natural resources provided by nature. We were inspired by a collection of young children in love with smell of fresh soil.
        </p>
        <p class="container text-dark" id="paraBout">
        Natura is a South African supermarket chain that operates franchised grocery stores and convenience stores in Southern Africa. The company is a member of the Franchise Association of South Africa. As of 2022, there are over 300 stores in South Africa, 2 in Botswana and 3 in Namibia. 
        </p>
      </div>
    <div class="image-container">
      <img class="img-fluid" loading="lazy" src="https://iili.io/JMHW6aj.jpg" alt="Your Image">
    </div>
  </div>
  </div>
</template>

<style scoped>
#aboutImg{
  width: 100%;
  height: 200px;
  object-fit: cover;
  }  
  
  .about {
    padding-top: 100px;
   }
   
   .flex-container {
     display: flex;
     flex-direction: row; 
     justify-content: space-between; 
     align-items: center; 
     flex-wrap: wrap;
     margin-top: 100px;
   }
   
   .image-container {
    height: 400px;
    width: 400px ;
   }
   
   .paragraph-container {
     width: 60%;
     padding-bottom: 200px; 
   }
   #heading{
     padding-bottom: 200px;
   }
   .img-fluid{
    width: 500px;
    height: 500px;
   }
   #paraBout{
    font-size: larger;
   }
   #Aboutpage1{
    margin-top: -200px;
    margin-left: 900px; 
    color: white;
   }
   /* Contact */
   #Contactpage1{
    margin-top: -900px;
    margin-left: 900px; 
    color: white;
    font-style: italic;
    font-weight: lighter;
   
   }
      /*logo  */
      #logo{
        width: 100px;
        height: 100px;
      }
       
</style>
