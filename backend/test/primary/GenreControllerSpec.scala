package primary

import org.scalatestplus.play._
import play.api.inject.bind
import play.api.inject.guice.GuiceApplicationBuilder
import play.api.test._
import play.api.test.Helpers._
import secondary.repositoryFactory.{BeatRepositoryFactory, InMemoryBeatRepositoryFactory}

class GenreControllerSpec extends PlaySpec {
  "GenreController" should {
    "get the JSON genres" in {
      val app = new GuiceApplicationBuilder()
        .overrides(bind(classOf[BeatRepositoryFactory]).to(classOf[InMemoryBeatRepositoryFactory]))
        .build()

      val genreRequest = FakeRequest(GET, "/genres/")
      val genresResult = route(app, genreRequest).get

      status(genresResult) mustBe OK
      contentType(genresResult) mustBe Some("application/json")
      contentAsString(genresResult) must include("Techno")
    }
  }
}
