import { ReloadIcon } from '@radix-ui/react-icons'
import { useRef, useState } from 'react'

import { usePlanets } from '@/api/usePlanets'
import { usePostLaunch } from '@/api/usePostLaunch'
import { DatePicker } from '@/components/ui/DatePicker'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const Launch = () => {
  const [date, setDate] = useState<Date>()
  const [mission, setMission] = useState('')
  const [rocketType, setRocketType] = useState('Explorer IS1')
  const [destination, setDestination] = useState('')

  const successAudioRef = useRef<HTMLAudioElement>(null)
  const abortAudioRef = useRef<HTMLAudioElement>(null)

  const { planets, isLoadingPlanets } = usePlanets()
  const { addLaunch, isLaunching } = usePostLaunch()

  function handleSubmit() {
    if (
      date !== undefined &&
      mission !== '' &&
      rocketType !== '' &&
      destination !== ''
    ) {
      addLaunch(
        {
          launchDate: date,
          mission: mission,
          rocket: rocketType,
          destination: destination,
        },
        {
          onSuccess: () => {
            setDate(undefined)
            setMission('')
            setRocketType('Explorer IS1')
            setDestination('')

            successAudioRef.current?.play()
          },
          onError: () => {
            abortAudioRef.current?.play()
          },
        }
      )
    }
  }

  return (
    <div className="mx-auto mt-12 flex max-w-4xl flex-col gap-4 rounded-lg border-2 border-primary px-12 py-16 text-xl">
      <div className="space-y-4 text-xl">
        <h1>
          Schedule a mission launch for interstellar travel to one of the Kepler
          Exoplanets
        </h1>
        <p>
          Only confirmed planets matching the following criteria are available
          for the earliest scheduled missions:
        </p>
      </div>

      <div className="space-y-2 pl-8 text-xl">
        <ol>* Planets radius &lt; 1.6 times earth radius.</ol>
        <ol>
          * Effective stellar flux &gt; 0.36 times earth's value and &lt; 1.11
          times of earth's value.
        </ol>
      </div>

      <div className="flex max-w-lg flex-col gap-2 text-base">
        <div className="flex items-center justify-between">
          <Label className="text-lg" htmlFor="title">
            Launch Date:
          </Label>
          <DatePicker date={date} setDate={setDate} />
        </div>

        <div className="flex items-center justify-between">
          <Label className="text-lg" htmlFor="title">
            Mission Name:
          </Label>
          <Input
            value={mission}
            onChange={(e) => setMission(e.target.value)}
            className="max-w-[240px]"
          />
        </div>

        <div className="flex items-center justify-between">
          <Label className="text-lg" htmlFor="title">
            Rocket Type:
          </Label>
          <Input
            value={rocketType}
            onChange={(e) => setRocketType(e.target.value)}
            className="max-w-[240px]"
          />
        </div>

        <div className="flex items-center justify-between">
          <Label className="text-lg" htmlFor="title">
            Destination Exoplanet:
          </Label>
          <Select
            value={destination}
            onValueChange={(selectedDestination) =>
              setDestination(selectedDestination)
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select planet" />
            </SelectTrigger>
            <SelectContent>
              {planets?.map((planet) => (
                <SelectItem key={planet.kepler_name} value={planet.kepler_name}>
                  {planet.kepler_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button
        onClick={handleSubmit}
        disabled={isLaunching || isLoadingPlanets}
        className="w-56 rounded-none border-button font-semibold text-button shadow-2xl delay-0 hover:bg-button"
        size="lg"
        variant="outline"
      >
        {isLaunching && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
        Launch Mission
      </Button>

      <audio ref={successAudioRef} src="/sound/success.mp3" />
      <audio ref={abortAudioRef} src="/sound/abort.mp3" />
    </div>
  )
}

export default Launch
