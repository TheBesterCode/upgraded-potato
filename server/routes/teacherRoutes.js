const express = require('express'),
    router = express.Router(),
    sha256 = require('js-sha256').sha256,
    Teachers = require('../models/TeacherSchema')

router.route('/getGroups').post((req, res) => {
    Teachers.find({
        key: sha256(req.body.key)
    }, (error, data) => {
        if (error) return error
        try {
            res.json(data[0].groups)
        } catch (TypeError) {
            res.json(null)
        }
    })
})

router.route('/getGroupRegisters').post(function (req, res) {
    Teachers.find({
        key: sha256(req.body.key)
    }, (error, data) => {
        if (error) return error
        try {
            res.json(data[0].groups[req.body.group].regs)
        } catch (TypeError) {
            res.json(null)
        }
    })
})

router.route('/addNewGroupRegister').post((req, res) => {
    const teacher = req.body.key,
          group = req.body.group,
          group_length = req.body.group_length,
          new_reg = req.body.new_reg

    Teachers.findOne({
        key: sha256(teacher)
    }, async (error, data) => {
        if (error) throw error
        //TODO: Implement for diferents regs
        new_regs = []
        for(let i = 0; i < group_length; i++) {
            new_regs.push('')
        }
        data.groups[group].regs.Actividades[new_reg] = {
            desc: '',
            regs: new_regs
        }
        data.markModified('groups')
        await data.save()
        res.json('xd')
    })
})

module.exports = router
