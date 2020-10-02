import { config, library } from "@fortawesome/fontawesome-svg-core"
import { faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons"
import { faRss, faHashtag, faUserAlt } from "@fortawesome/free-solid-svg-icons"

config.autoAddCss = false
library.add(faRss, faHashtag, faTwitter, faGithub, faUserAlt)
