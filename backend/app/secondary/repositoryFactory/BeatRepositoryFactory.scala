package secondary.repositoryFactory

import com.google.inject.ImplementedBy
import domain.BeatRepository

@ImplementedBy(classOf[MongoBeatRepositoryFactory])
trait BeatRepositoryFactory {
  def createMongoRepository(connectionString: String, databaseName: String): BeatRepository
}
