require('mocha')

const sinon = require('sinon')

const {
    GetAllItems,
    GetUniqueItem,
    AddNewItem,
    UpdateItem,
    DeleteItem
} = require('../../scr/manager/teams')

var teams = require('../../routes/localStorage');

describe("teams", function() {
    let team
    beforeEach(() => {
        team = teams
    })

    it('Will show all items', () => {
        const sandbox = sinon.createSandbox()
        const statusMock = sandbox.stub()
        const jsonMock = sandbox.stub()
        const reqMock = sandbox.stub()
        const nextMock = sandbox.stub()
        const sendMock = sandbox.stub()

        const resMock = {
            status: statusMock,
            json: jsonMock,
            send: sendMock
        }

        GetAllItems(reqMock, resMock, nextMock)
        sinon.assert.calledWith(statusMock, 200)
        sinon.assert.calledWith(jsonMock, team)
    })

    it('Will show one item', () => {
        const sandbox = sinon.createSandbox()
        const statusMock = sandbox.stub()
        const jsonMock = sandbox.stub()
        const nextMock = sandbox.stub()
        const sendMock = sandbox.stub()

        const reqMock = {
            params: {
              'id': 1
            }
        }
        
        const resMock = {
            status: statusMock,
            json: jsonMock,
            send: sendMock
        }

        GetUniqueItem(reqMock, resMock, nextMock)
        sinon.assert.calledWith(statusMock, 200)
        sinon.assert.calledWith(jsonMock, { id: 1, liga: 'Premier League', nombre: 'Liverpool', campeonatos: 6, puntos: 0, escudo: '.\\assets\\images\\liverpool.png'})
    })

    it('Will not show an item', () => {
        const sandbox = sinon.createSandbox()
        const statusMock = sandbox.stub()
        const jsonMock = sandbox.stub()
        const nextMock = sandbox.stub()
        const sendMock = sandbox.stub()

        const reqMock = {
            params: {
              'id': 68543125
            }
        }
        
        const resMock = {
            status: statusMock,
            json: jsonMock,
            send: sendMock
        }

        GetUniqueItem(reqMock, resMock, nextMock)
        sinon.assert.calledWith(statusMock, 404)
        sinon.assert.calledWith(sendMock, "404 manejado")
    })

    it('Will add one item', () => {
        const sandbox = sinon.createSandbox()
        const statusMock = sandbox.stub()
        const jsonMock = sandbox.stub()
        const nextMock = sandbox.stub()
        const sendMock = sandbox.stub()

        const reqMock = {
            body: {
                'id' : 8,
                'liga': 'Premie',
                'nombre': 'Liverp',
                'campeonatos': 18,
                'puntos': 25,
                'escudo': 'ruta a utilizar'
            }
        }
        
        const resMock = {
            status: statusMock,
            json: jsonMock,
            send: sendMock
        }

        AddNewItem(reqMock, resMock, nextMock)
        sinon.assert.calledWith(statusMock, 201)
        sinon.assert.calledWith(sendMock, "agregado")
    })

    it('Will not add one item', () => {
        const sandbox = sinon.createSandbox()
        const statusMock = sandbox.stub()
        const jsonMock = sandbox.stub()
        const nextMock = sandbox.stub()
        const sendMock = sandbox.stub()

        const reqMock = {
            body: {
                'id' : 1,
                'liga': 'Premie',
                'nombre': 'Liverp',
                'campeonatos': 18,
                'puntos': 25,
                'escudo': 'ruta a utilizar'
            }
        }
        
        const resMock = {
            status: statusMock,
            json: jsonMock,
            send: sendMock
        }

        AddNewItem(reqMock, resMock, nextMock)
        sinon.assert.calledWith(statusMock, 404)
        sinon.assert.calledWith(sendMock, "404 manejado")
    })

    it('Will update one item', () => {
        const sandbox = sinon.createSandbox()
        const statusMock = sandbox.stub()
        const jsonMock = sandbox.stub()
        const nextMock = sandbox.stub()
        const sendMock = sandbox.stub()

        const reqMock = {
            params: {
                'id': '1'
              },
            body: {
                'liga': 'Premie',
                'nombre': 'Liver',
                'campeonatos': 18,
                'puntos': 25,
                'escudo': 'ruta a utilizar'
            }
        }
        
        const resMock = {
            status: statusMock,
            json: jsonMock,
            send: sendMock
        }

        UpdateItem(reqMock, resMock, nextMock)
        sinon.assert.calledWith(statusMock, 204)
        sinon.assert.calledWith(sendMock, "actualizado")
    })

    it('Will not update one item', () => {
        const sandbox = sinon.createSandbox()
        const statusMock = sandbox.stub()
        const jsonMock = sandbox.stub()
        const nextMock = sandbox.stub()
        const sendMock = sandbox.stub()

        const reqMock = {
            params: {
                'id': 1896451
              },
            body: {
                'liga': 'Premie',
                'nombre': 'Liverp',
                'campeonatos': 18,
                'puntos': 25,
                'escudo': 'ruta a utilizar'
            }
        }
        
        const resMock = {
            status: statusMock,
            json: jsonMock,
            send: sendMock
        }

        UpdateItem(reqMock, resMock, nextMock)
        sinon.assert.calledWith(statusMock, 404)
        sinon.assert.calledWith(sendMock, "404 manejado")
    })
    
    it('Will delete one item', () => {
        const sandbox = sinon.createSandbox()
        const statusMock = sandbox.stub()
        const jsonMock = sandbox.stub()
        const nextMock = sandbox.stub()
        const sendMock = sandbox.stub()

        const reqMock = {
            params: {
              'id': 1
            }
        }
        
        const resMock = {
            status: statusMock,
            json: jsonMock,
            send: sendMock
        }

        DeleteItem(reqMock, resMock, nextMock)
        sinon.assert.calledWith(statusMock, 204)
        sinon.assert.calledWith(sendMock, "borrado")
    })

    it('Will not delete an item', () => {
        const sandbox = sinon.createSandbox()
        const statusMock = sandbox.stub()
        const jsonMock = sandbox.stub()
        const nextMock = sandbox.stub()
        const sendMock = sandbox.stub()

        const reqMock = {
            params: {
              'id': 68543125
            }
        }
        
        const resMock = {
            status: statusMock,
            json: jsonMock,
            send: sendMock
        }

        DeleteItem(reqMock, resMock, nextMock)
        sinon.assert.calledWith(statusMock, 404)
        sinon.assert.calledWith(sendMock, "404 manejado")
    })
})