function postBlog(req, res){
    const body = req.body;

    if (!body){
        return res.status(400).json({messagae:"Body is malformed or doesn't exist"});
    }
    res.send("post blog");
}

module_exports = {
    postBlog,
}