const Stocks = require("../models/stock");

exports.getAllStocks = (async(req,res)=>{
   
    // console.log(req.params.key);
    try{ 
       const filter = {"Key" : req.params.key}
       const stock = await Stocks.find(filter);
       if(stock){ 
        res.status(200).json({
            success : true,
            stock
        })
       }
       else{
        res.status(404).send("Stocks Not Found")
       } 
       }
       catch(e){
        res.status(400).send("Unable to get the Stocks Data");
       }
    



})



function sortByKey(array, key) {
    return array.sort(function(a, b) {
        const x = a[key], y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
    }
    
    function sortByKeyDesc(array, key) {
        return array.sort(function(a, b) {
            const x = a[key], y = b[key];
            return ((x > y) ? -1 : ((x < y) ? 1 : 0));
        });
        } 

exports.getSortedByDate = (async(req,res)=>{
    
    try{ 
        const filter = {"Key" : req.params.key}
        let stock = await Stocks.find(filter);
        
        const order = req.params.order;
       
       if(order=="desc") 
        stock = sortByKeyDesc(stock, 'Date');
       else
        stock = sortByKey(stock,'Date');
        

        if(stock){ 
         res.status(200).json({
             success : true,
             stock
         })
        }
        else{
         res.status(404).send("Stocks Not Found")
        } 
        }
        catch(e){
         res.status(400).send("Unable to get the Stocks Data");
        }

})



exports.getBySpan = (async(req,res)=>{
    
    try{ 
        const filter = {"Key" : req.params.key}
        let stock = await Stocks.find(filter);
        
        const span = req.params.span;

        stock = sortByKeyDesc(stock,"Date")
        
        stock = stock.slice(0,span)



        if(stock){ 
         res.status(200).json({
             success : true,
             stock
         })
        }
        else{
         res.status(404).send("Stocks Not Found")
        } 
        }
        catch(e){
         res.status(400).send("Unable to get the Stocks Data");
        }

})


exports.getAllStocksVolumeSortBySpan = (async(req,res)=>{
    

        try{ 
        
        const companies = ["ashokley","cipla","eichermot","reliance","tatasteel"];
        let data = [];
        const span = req.params.span;
        
            for(let i = 0; i < 5;i++){
                const filter = {"Key":companies[i]}
                let stock = await Stocks.find(filter);
                stock = sortByKeyDesc(stock,"Date")
                stock = stock.slice(0,span);
                let totalVolume = 0;
                for(let j = 0 ;  j < span ; j++ ){
                    totalVolume += stock[j].Volume
                }
                data.push({"x":companies[i],"y" : totalVolume});  
            } 
    
        if(data){ 
         res.status(200).json({
             success : true,
             data
         })
        }
        else{
         res.status(404).send("Stocks Not Found")
        } 
        }
        catch(e){
            console.log(e);
         res.status(400).send("Unable to get the Stocks Data");
        }


      
})


exports.getAllParamsStockBySpan = (async(req,res)=>{
     try{
         const filter = req.params.stock;
         const span = req.params.span;
         
         let stock = await Stocks.find(filter);
         stock = sortByKeyDesc(stock,"Date");
         stock = stock.slice(0,span);
         let high = -1;
         let low = 100000000000000000;
         let highClose = -1;
         let highOpen = -1;
         for(let i = 0 ; i < span ; i++){

            if(stock[i].High > high){
                high = stock[i].High;
            }
            if(stock[i].Low < low){
                low = stock[i].Low;
            }
            if(stock[i].Open > highOpen){
                highOpen = stock[i].Open;
            }
            if(stock[i].Close > highClose){
                highClose = stock[i].Close;
            }

         }

         if(high!=-1){
            res.status(200).send({"Stock" : filter,"Highest": high,"Lowest":low,"Highest Open":highOpen,"Highest Close": highClose});
         }
         else{
            res.send(404).send("Data Not Found");
         }


     }
     catch(e){
        console.log(e);
        res.status(400).send("Internal Server Error");
     }
})