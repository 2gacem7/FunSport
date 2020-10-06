import { Body, Controller, Get, Header, Res, Request } from '@nestjs/common';
import { Response } from 'express'
import { createReadStream } from 'fs';
@Controller('about')
export class AboutController {
    @Get()
    @Header('Content-type', 'application/json')
    @Header('Content-disposition', 'attachment; filename=about.json')

    async getAboutServices(@Res() res:Response): Promise<any> {
        // let request = require('request');
        // let customer = { host: "" }
        // let server = { current_time: "", services: [] }

        // let myIp = await new Promise(resolve => {
        //     request({
        //         url: `http://api.myip.com/`,
        //         method: "",
        //         headers: {},
        //         json: true
        //     }, function (error, response, body) {
        //         if (!error){
        //             resolve(body.ip)
        //         } else {
        //             console.error(error)
        //         }
        //     })
        // });

        // customer.host = myIp.toString()

        // server.current_time = Date.now().toString();

        // for (let port = 3001; port < 3006; port++) {
        //     let test = await new Promise(resolve => {
        //         request({
        //             url: `http://localhost:${port}/about`,
        //             method: "",
        //             headers: {},
        //             json: true
        //         }, function (error, response, body) {
        //             if (!error)
        //                 resolve(body)
        //         })
        //     });
        //     server.services.push(test);
        // }
        let path = require('path');

        // const dataAbout = JSON.stringify({customer, server})
        var fs = require('fs');
        // const file = fs.writeFile(path.join(__dirname)+'/about.json',dataAbout,
        //     (err) => {
        //         if (err) throw err;
        //         console.log('JSON écrit !')
        // })


        // res.writeHead(201,{"Content-type":"application/json","Content-Disposition":"attachment; filename='./about.json'"})
     res.sendFile('about.json',{encoding:'utf-8', root:path.join(__dirname),'content-type':'application/json'})

    }
}
