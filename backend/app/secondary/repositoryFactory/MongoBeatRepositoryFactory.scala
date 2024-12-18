package secondary.repositoryFactory

import domain.BeatRepository
import org.mongodb.scala.MongoClient
import secondary.MongoBeatRepository

class MongoBeatRepositoryFactory extends BeatRepositoryFactory {
  override def createMongoRepository(connectionString: String, databaseName: String): BeatRepository = {
    val mongoClient = MongoClient(connectionString)
    val database = mongoClient.getDatabase(databaseName)
    new MongoBeatRepository(database)
  }
}
