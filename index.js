const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.y4verkf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0;`

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {

    // await client.connect();

    const createUserCollection = client.db('learningEarning').collection('createUsers');
    const imagesCollection = client.db('learningEarning').collection('images');
    const activeClickPaymentCollection = client.db('learningEarning').collection('activeClickPayment');
    const seniorTeamLeaderCollection = client.db('learningEarning').collection('seniorTeamLeader');
    const teamLeaderCollection = client.db('learningEarning').collection('teamLeader');
    const noticeCollection = client.db('learningEarning').collection('notices');
    const trainerDataCollection = client.db('learningEarning').collection('TraninerData');
    const productsCollection = client.db('learningEarning').collection('products');
    const controllerMappingDataCollection = client.db('learningEarning').collection('controllerMappingData');
    const courseDataCollection = client.db('learningEarning').collection('courseData');
    const studentHomeworkCollection = client.db('learningEarning').collection('studentHomework');
    const teacherClassCollection = client.db('learningEarning').collection('teacherClass');
    const submitHomeworkCollection = client.db('learningEarning').collection('submitHomework');
    const authorInfoCollection = client.db('learningEarning').collection('authorInfo');
    const teamLeaderMappingMemberCollection = client.db('learningEarning').collection('teamLeaderMappingMember');
    const councilorMappingStudentCollection = client.db('learningEarning').collection('councilorMappingStudent');
    const trainerMappingTrainerCollection = client.db('learningEarning').collection('trainerMappingTrainer');
    const seniorTeamMappingMemberCollection = client.db('learningEarning').collection('seniorTeamMappingMember');

    

    // Create user API
    app.post('/createUsers', async (req, res) => {
      const user = req.body;
      const result = await createUserCollection.insertOne(user);
      res.send(result);
    });

    // app.get('/createUsers', async (req, res) => {
    //   const result = await createUserCollection.find().toArray();
    //   res.send(result);
    // });

    app.get('/createUsers/:id', async (req, res) => {
      const id = req.params.id;
    
      if (!ObjectId.isValid(id)) {
        return res.status(400).send({ message: 'Invalid ObjectId format' });
      }
    
      const query = { _id: new ObjectId(id) };
      const user = await createUserCollection.findOne(query);
      res.send(user);
    });
    
    app.get('/createUsers/', async(req, res) => {
      let query = {};
      if(req.query?.user_email){
          query ={user_email: req.query.user_email}
      }
      const result = await createUserCollection.find(query).toArray();
      res.send(result);
      })

      app.delete('/createUsers/:id', async(req, res) => {
        const id = req.params.id;
        const query = {_id: new ObjectId(id)};
        const result = await createUserCollection.deleteOne(query);
        res.send(result)
      })

    app.patch('/createUsers/:id',  async (req, res) => {
      const id = req.params.id;
      const status = req.body.status;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          status: status
        }
      };
      const result = await createUserCollection.updateOne(filter, updateDoc);
      res.send(result);
    });
    app.delete('/createUsers/:id', async(req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await createUserCollection.deleteOne(query);
      res.send(result)
    })

    app.put('/createUsers/councilor/:id',  async (req, res) => {
      const id = req.params.id;
      const data = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          smsDone:data.smsDone
        }
      };
      const result = await createUserCollection.updateOne(filter, updateDoc, options);
      res.send(result);
    });

    // image api
    app.post('/images', async (req, res) => {
      const photo = req.body;
      const result = await imagesCollection.insertOne(photo);
      res.send(result);
    });

    app.get('/images', async (req, res) => {
      const email = req.query.email;
      const query = {email: email};
      const result = await imagesCollection.find(query).toArray();
      res.send(result);
    });

    app.get('/images/:id', async (req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id) };
      const photo = await imagesCollection.findOne(query);
      res.send(photo);
    });
    app.patch('/images/like/:id', async (req, res) => {
      const id = req.params.id;
      const filter = {_id: new ObjectId(id)};
      const update = req.body;
      const updateDoc = {
        $inc: {
          like: update.like,
        }
      }
      const result = await imagesCollection.updateOne(filter, updateDoc);
      res.send(result)
    })
    app.patch('/images/dislike/:id', async (req, res) => {
      const id = req.params.id;
      const filter = {_id: new ObjectId(id)};
      const update = req.body;
      const updateDoc = {
        $inc: {
          dislike: update.dislike,
        }
      }
      const result = await imagesCollection.updateOne(filter, updateDoc);
      res.send(result)
    })






      //  when a user active any student then get pament
      app.post('/activeClickPayment', async (req, res) => {
        const user = req.body;
        const result = await activeClickPaymentCollection.insertOne(user);
        res.send(result);
      });
      app.get('/activeClickPayment', async (req, res) => {
        const result = await activeClickPaymentCollection.find().toArray();
        res.send(result);
      });



      // senior team leader

      app.post('/seniorTeamLeader', async (req, res) => {
        const user = req.body;
        const result = await seniorTeamLeaderCollection.insertOne(user);
        res.send(result);
      });
      // app.get('/seniorTeamLeader', async (req, res) => {
      //   const result = await seniorTeamLeaderCollection.find().toArray();
      //   res.send(result);
      // });
      app.get('/seniorTeamLeader', async(req, res) => {
        let query = {};
        if(req.query?.seniorTeamLeaderEmail){
            query ={seniorTeamLeaderEmail: req.query.seniorTeamLeaderEmail}
        }
        const result = await seniorTeamLeaderCollection.find(query).toArray();
        res.send(result);
        })

        // team leader api
        app.post('/teamLeader', async (req, res) => { 
          const user = req.body;
          const result = await teamLeaderCollection.insertOne(user);
          res.send(result);
        });

        app.get('/teamLeader', async(req, res) => {
          let query = {};
          if(req.query?.teamLeaderEmail){
              query ={teamLeaderEmail: req.query.teamLeaderEmail}
          }
          const result = await teamLeaderCollection.find(query).toArray();
          res.send(result);
          })



          //  notice collection

          app.post('/notices', async (req, res) => {
            const item = req.body;
            const result = await noticeCollection.insertOne(item);
            res.send(result);
          });

          app.get('/notices', async(req, res) => {
            const result = await noticeCollection.find().toArray();
            res.send(result);
            })
            app.get('/notices/:id', async (req, res) => {
              const id = req.params.id;
              const query = {_id: new ObjectId(id) };
              const notice = await noticeCollection.findOne(query);
              res.send(notice);
            });

            app.delete('/notices/:id', async(req, res) => {
              const id = req.params.id;
              const query = {_id: new ObjectId(id)};
              const result = await noticeCollection.deleteOne(query);
              res.send(result)
            })



          // trainer related api

          app.post('/TraninerData', async (req, res) => {
            const item = req.body;
            const result = await trainerDataCollection.insertOne(item);
            res.send(result);
          });
          app.get('/TraninerData', async(req, res) => {
            const result = await trainerDataCollection.find().toArray();
            res.send(result);
            })



          // producy related api
          app.post('/products', async (req, res) => {
            const item = req.body;
            const result = await productsCollection.insertOne(item);
            res.send(result);
          });
          app.get('/products', async(req, res) => {
            const result = await productsCollection.find().toArray();
            res.send(result);
            })
            app.get('/products/:id', async(req, res) => {
              const id = req.params.id;
              const query = {_id: new ObjectId(id)};
              const item = await productsCollection.findOne(query);
              res.send(item);
            })

            app.delete('/products/:id', async(req, res) => {
              const id = req.params.id;
              const query = {_id: new ObjectId(id)};
              const result = await productsCollection.deleteOne(query);
              res.send(result)
            })


            // controller mapping in councilor

            app.post('/controllerMappingData', async (req, res) => {
              const item = req.body;
              const result = await controllerMappingDataCollection.insertOne(item);
              res.send(result);
            });

            app.get('/controllerMappingData', async(req, res) => {
              const result = await controllerMappingDataCollection.find().toArray();
              res.send(result);
              })

            
              // course related api

              app.post('/courseData', async (req, res) => {
                const item = req.body;
                const result = await courseDataCollection.insertOne(item);
                res.send(result);
              });
  
              app.get('/courseData', async(req, res) => {
                const result = await courseDataCollection.find().toArray();
                res.send(result);
                })
                app.get('/courseData/:id', async(req, res) => {
                  const id = req.params.id;
                  const query = {_id: new ObjectId(id)};
                  const item = await courseDataCollection.findOne(query);
                  res.send(item);
                })

                app.delete('/courseData/:id', async(req, res) => {
                  const id = req.params.id;
                  const query = {_id: new ObjectId(id)};
                  const result = await courseDataCollection.deleteOne(query);
                  res.send(result)
                })


                // homeworks related api

                app.post('/studentHomework', async (req, res) => {
                  const item = req.body;
                  const result = await studentHomeworkCollection.insertOne(item);
                  res.send(result);
                });
    
                app.get('/studentHomework', async(req, res) => {
                  const result = await studentHomeworkCollection.find().toArray();
                  res.send(result);
                  })
                  app.get('/studentHomework/:id', async(req, res) => {
                    const id = req.params.id;
                    const query = {_id: new ObjectId(id)};
                    const item = await studentHomeworkCollection.findOne(query);
                    res.send(item);
                  })
  
                  app.delete('/studentHomework/:id', async(req, res) => {
                    const id = req.params.id;
                    const query = {_id: new ObjectId(id)};
                    const result = await studentHomeworkCollection.deleteOne(query);
                    res.send(result)
                  })
                  app.put('/studentHomework/:id', async(req, res) => {
                    const id = req.params.id;
                    const data = req.body;
                    const filter = {_id: new ObjectId(id)};
                    const options = {upsert: true};
                    const updateDoc = {
                      $set: {
                        status:data.status
                      },
                    };
                    const result = await studentHomeworkCollection.updateOne(filter, updateDoc, options);
                    res.send(result);
                })




                  // teacher class related api
                  app.post('/teacherClass', async (req, res) => {
                    const item = req.body;
                    const result = await teacherClassCollection.insertOne(item);
                    res.send(result);
                  });
      
                  app.get('/teacherClass', async(req, res) => {
                    let query = {};
                    if(req.query?.teacherEmail){
                        query ={teacherEmail: req.query.teacherEmail}
                    }
                    const result = await teacherClassCollection.find(query).toArray();
                    res.send(result);
                    })
                    app.get('/teacherClass/:id', async(req, res) => {
                      const id = req.params.id;
                      const query = {_id: new ObjectId(id)};
                      const item = await teacherClassCollection.findOne(query);
                      res.send(item);
                    })
    
                    app.delete('/teacherClass/:id', async(req, res) => {
                      const id = req.params.id;
                      const query = {_id: new ObjectId(id)};
                      const result = await teacherClassCollection.deleteOne(query);
                      res.send(result)
                    })

                    // submit homework api

                    app.post('/submitHomework', async (req, res) => {
                      const item = req.body;
                      const result = await submitHomeworkCollection.insertOne(item);
                      res.send(result);
                    });
        
                    app.get('/submitHomework', async(req, res) => {
                      let query = {};
                      if(req.query?.studentEmail){
                          query ={studentEmail: req.query.studentEmail}
                      }
                      const result = await submitHomeworkCollection.find(query).toArray();
                      res.send(result);
                      })
                      app.get('/submitHomework/:id', async(req, res) => {
                        const id = req.params.id;
                        const query = {_id: new ObjectId(id)};
                        const item = await submitHomeworkCollection.findOne(query);
                        res.send(item);
                      })
      
                      app.delete('/submitHomework/:id', async(req, res) => {
                        const id = req.params.id;
                        const query = {_id: new ObjectId(id)};
                        const result = await submitHomeworkCollection.deleteOne(query);
                        res.send(result)
                      })
                      app.put('/submitHomework/:id', async(req, res) => {
                        const id = req.params.id;
                        const data = req.body;
                        const filter = {_id: new ObjectId(id)};
                        const options = {upsert: true};
                        const updateDoc = {
                          $set: {
                            status:data.status
                          },
                        };
                        const result = await submitHomeworkCollection.updateOne(filter, updateDoc, options);
                        res.send(result);
                    })




                      // author info related api
                      app.post('/authorInfo', async (req, res) => {
                        const item = req.body;
                        const result = await authorInfoCollection.insertOne(item);
                        res.send(result);
                      });

                      app.get('/authorInfo', async(req, res) => {
                        const result = await authorInfoCollection.find().toArray();
                        res.send(result);
                        }
                      )
                      app.get('/authorInfo/:id', async(req, res) => {
                        const id = req.params.id;
                        const query = {_id: new ObjectId(id)};
                        const item = await authorInfoCollection.findOne(query);
                        res.send(item);
                      })
      
                      app.delete('/authorInfo/:id', async(req, res) => {
                        const id = req.params.id;
                        const query = {_id: new ObjectId(id)};
                        const result = await authorInfoCollection.deleteOne(query);
                        res.send(result)
                      })

                      // team leader mappi api

                      app.post('/teamLeaderMappingMember', async (req, res) => {
                        const item = req.body;
                        const result = await teamLeaderMappingMemberCollection.insertOne(item);
                        res.send(result);
                      });

                      app.get('/teamLeaderMappingMember', async(req, res) => {
                        let query = {};
                        if(req.query?.teamLeaderEmail){
                            query ={teamLeaderEmail: req.query.teamLeaderEmail}
                        }
                        const result = await teamLeaderMappingMemberCollection.find(query).toArray();
                        res.send(result);
                        })

                        app.post('/trainerMappingTrainer', async (req, res) => {
                          const item = req.body;
                          const result = await trainerMappingTrainerCollection.insertOne(item);
                          res.send(result);
                        });

                        app.get('/trainerMappingTrainer', async(req, res) => {
                          let query = {};
                          if(req.query?.trainerEmail){
                              query ={trainerEmail: req.query.trainerEmail}
                          }
                          const result = await trainerMappingTrainerCollection.find(query).toArray();
                          res.send(result);
                          })


                        // councilor mapping data from controller

                        app.post('/councilorMappingStudent', async (req, res) => {
                          const item = req.body;
                          const result = await councilorMappingStudentCollection.insertOne(item);
                          res.send(result);
                        });
  
                        app.get('/councilorMappingStudent', async(req, res) => {
                          let query = {};
                          if(req.query?.councilorEmail){
                              query ={councilorEmail: req.query.councilorEmail}
                          }
                          const result = await councilorMappingStudentCollection.find(query).toArray();
                          res.send(result);
                          })
                          app.get('/councilorMappingStudent/:id', async(req, res) => {
                            const id = req.params.id;
                            const query = {_id: new ObjectId(id)};
                            const item = await councilorMappingStudentCollection.findOne(query);
                            res.send(item);
                          })
  
                          // seior team mappaing member
                          app.post('/seniorTeamMappingMember', async (req, res) => {
                            const item = req.body;
                            const result = await seniorTeamMappingMemberCollection.insertOne(item);
                            res.send(result);
                          });
    
  
                          app.get('/seniorTeamMappingMember', async(req, res) => {
                            let query = {};
                            if(req.query?.senionLeaderEmail){
                                query ={senionLeaderEmail: req.query.senionLeaderEmail}
                            }
                            const result = await seniorTeamMappingMemberCollection.find(query).toArray();
                            res.send(result);
                            })

                            app.get('/seniorTeamMappingMember/:id', async(req, res) => {
                              const id = req.params.id;
                              const query = {_id: new ObjectId(id)};
                              const item = await seniorTeamMappingMemberCollection.findOne(query);
                              res.send(item);
                            })










                          // await client.db("admin").command({ ping: 1 });
                          // console.log("Pinged your deployment. You successfully connected to MongoDB!");
                        } finally {
                          // await client.close();
                        }
                      }
                      run().catch(console.dir);

                      app.get('/', (req, res) => {
                        res.send('learning server is running');
                      });

                      app.listen(port, () => {
                        console.log(`Example app listening on port ${port}`);
                      });
