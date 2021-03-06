import Sequelize  from "sequelize";

function valid(Model, payload){
    return Object.entries(Model.tableAttributes).reduce((valid, [name, field])=>{
        if(valid 
            && !field._autoGenerated 
            && !field.primaryKey
            && field.allowNull === false
            && !payload[name]){
                valid = false;
            }
            return valid;
    }, true);
}

function attributes(request){
    if( request.headers['x-fields']){
        return request.headers['x-fields'].split(',');

    }
}
function where(request){
    if(request.query.filter){
        return request.query.filter.split(',').reduce((filter, condition)=>{
           let data=condition.split('-');
           filter[data[0]]={[Sequelize.Op[data[1]]]: data[2]};
           return filter;
        }, {});
    }else{
        return undefined;
    }
}

function order(request){
    if(request.headers['x-sort']){
        return request.headers['x-sort'].split(',').reduce((sort, field)=>{
            sort.push([field.substring(1), field.charAt(0) === '+' ? 'ASC': 'DESC']);

            return sort;
        }, [])
    }else{
        return undefined;
    }
}
async function getRecords(Model, request, response){
    try{
        let records = await Model.findAll({
            attributes: attributes(request),
            order: order(request),
            where: where(request)
        });
        if(records.length > 0){
            response.status(200).json(records);
        }else{
            response.status(204).send();
        }
    }
    catch(error){
        response.status(500).json(error);
    }
}

async function postRecord(Model, request, response){
    try{
        if(valid(Model, request.body)){
            let record = await Model.create(request.body);
            response.status(201)
            .location(`http://${request.headers.host}${request.baseUrl}${request.url}${request.url.endsWith('/') ? '' : '/'}${record.id}`)
            .send();
        }else{
            response.status(400).send();
        }
        
    }
    catch(error){
        response.status(500).json(error);
    }
}

async function patchRecord(Model, request, response){
    try{
        let record = await Model.findByPk(request.params.id);
        if( record ){
            Object.entries(request.body).forEach(([name, value])=>{
                record[name]=value
            }); 
            await record.save();
            response.status(204).send();

        }else{
            response.status(404).send();
        }
    }
    catch(error){
        response.status(500).json(error);
    }
}

async function deleteRecords(Model, request, response){
    try{
        await Model.truncate();
        response.status(204).send();
    }
    catch(error){
        response.status(500).json(error);
    }
}


async function getRecord(Model, request, response){
    try{
        let record = await Model.findByPk(request.params.id, { 
            attributes: attributes(request)});
        if( record ){
            response.status(200).json(record);
        }else{
            response.status(404).send();
        }
    }
    catch(error){
        response.status(500).json(error);
    }
}

async function putRecord(Model, request, response){
    try{
        let record = await Model.findByPk(request.params.id);
        if( record ){
            if( valid(Model, request.body)){
                await record.update(request.body);
                response.status(204).send();
            }else{
                response.status(400).send();
            }
        }else{
            response.status(404).send();
        }

    }
    catch(error){
        response.status(500).json(error);
    }
}

async function deleteRecord(Model, request, response){
    try{
        let record = await Model.findByPk(request.params.id);
        if( record ){
           await record.destroy();
           response.status(204).send();
        }else{
            response.status(404).send();
        }
    }
    catch(error){
        response.status(500).json(error);
    }
}



export{ getRecords, postRecord, deleteRecords,
    getRecord, putRecord, patchRecord, deleteRecord}