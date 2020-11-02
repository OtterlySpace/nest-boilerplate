import { Controller, Get, MessageEvent, Sse } from "@nestjs/common"
import { AppService } from "./app.service"
import { interval, Observable } from "rxjs"
import { map } from "rxjs/operators"

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	getHello(): string {
		return this.appService.getHello()
	}

	@Get("/sse")
	getSse(): string {
		return `
    <script type="text/javascript">
      const ee = new EventSource('/sseCall')
      ee.onmessage = ({data}) => {
        console.log('New message', JSON.parse(data))
      }
    </script>
    `
	}

	@Sse("/sseCall")
	sse(): Observable<MessageEvent> {
		return interval(1000).pipe(map((_) => ({ data: { hello: "world" } })))
	}
}
