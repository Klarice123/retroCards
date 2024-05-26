const { widget } = figma
const { useSyncedState, usePropertyMenu, AutoLayout, Text, SVG, Input, useWidgetId } = widget
// import uiHTML from '../ui.html'
// import openLinkHTML from '../openLink.html'

function Widget() {

  const widgetId = useWidgetId()

  /// COLORS ///
  const black100 = '#111'
  const black80 = '#111111cc'
  const black10 = '#1111111A'
  const todiscussColor = '#FFF'
  const todoColor = '#80CAFF'
  const inprogressColor = '#FFD966'
  const doneColor = '#85E0A3'
  const cancelledColor = '#E6E6E6'

  /// ICONS ///
  const addIcon = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      >
      <path
      d="M9.25 10.75H5V9.25H9.25V5H10.75V9.25H15V10.75H10.75V15H9.25V10.75Z"
      fill="#111111"
      />
      </svg>
      `
  const detailsIcon = `
    <svg 
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      >
      <path
      d="M3 14.5V13H12V14.5H3ZM3 10.75V9.25H17V10.75H3ZM3 7V5.5H17V7H3Z"
      fill="#111111"
      />
    </svg>`

const linkIcon = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    >
    <path
    d="M9 14H6C4.89333 14 3.95 13.6095 3.17 12.8286C2.39 12.0477 2 11.1033 2 9.99529C2 8.88732 2.39 7.94444 3.17 7.16667C3.95 6.38889 4.89333 6 6 6H9V7.5H6C5.30556 7.5 4.71528 7.74306 4.22917 8.22917C3.74306 8.71528 3.5 9.30556 3.5 10C3.5 10.6944 3.74306 11.2847 4.22917 11.7708C4.71528 12.2569 5.30556 12.5 6 12.5H9V14ZM7 10.75V9.25H13V10.75H7ZM11 14V12.5H14C14.6944 12.5 15.2847 12.2569 15.7708 11.7708C16.2569 11.2847 16.5 10.6944 16.5 10C16.5 9.30556 16.2569 8.71528 15.7708 8.22917C15.2847 7.74306 14.6944 7.5 14 7.5H11V6H14C15.1067 6 16.05 6.39046 16.83 7.17138C17.61 7.95229 18 8.89674 18 10.0047C18 11.1127 17.61 12.0556 16.83 12.8333C16.05 13.6111 15.1067 14 14 14H11Z"
    fill="#111111"
    />
  </svg>`  
    
    /// USERSTORY ///
    const [userstory, setUserstory] = useSyncedState<string>('userstory', '')
    
    type Option = {
      option: string,
      label: string,
    }
      
      
  /// PROGRESSION ///

  const [progression, setProgression] = useSyncedState<string>('progression', 'to discuss')
  const progressionOptions: Option[] = [
    {
      option: 'to discuss',
      label: 'To discuss'
    },
    {
      option: 'to do',
      label: 'To do'
    },
    {
      option: 'in progress',
      label: 'In progress'
    },
    {
      option: 'done',
      label: 'Done'
    },
    {
      option: 'cancelled',
      label: 'Cancelled'
    }
  ]
  const [progressionColor, setProgressionColor] = useSyncedState('progressionColor', todiscussColor)

  const text_decoration = progression === 'cancelled' ? 'strikethrough' : 'none'

  const cardOpacity = progression === 'cancelled' ? 0.7 : 1


  /// PRIORITY ///
  type Priority = 'MUST' | 'SHOULD' | 'COULD' | 'WON\'T'
  const [priority, setPriority] = useSyncedState<Priority>('priority', 'WON\'T')
  const priorityOptions: Option[] = [
    {
      option: 'MUST',
      label: 'Must have'
    },
    {
      option: 'SHOULD',
      label: 'Should have'
    },
    {
      option: 'COULD',
      label: 'Could have'
    },
    {
      option: 'WON\'T',
      label: 'Wont have'
    }
  ]
  

  const priorityIcons = (priority: Priority) => {

    const opacities = {
      'MUST': [1, 1, 1],
      'SHOULD': [1, 1, 0.08],
      'COULD': [1, 0.08, 0.08],
      'WON\'T': [0.08, 0.08, 0.08],
    }


    return (
      <AutoLayout verticalAlignItems={'center'}>
        {
          opacities[priority].map((opacity: number, index: number) => (
            <Text key={index} fontFamily="Inter" fontSize={24} opacity={opacity} lineHeight={24}>♥</Text>
          ))
        }
      </AutoLayout>
    )
  }

  /// COMPLEXITY ///

  const [complexity, setComplexity] = useSyncedState('complexity', 'S')

  const complexityOptions: Option[] = [
    {
      option: 'S',
      label: 'S - Easy'
    },
    {
      option: 'M',
      label: 'M - Moderate'
    },
    {
      option: 'L',
      label: 'L - Challenging'
    },
    {
      option: 'XL',
      label: 'XL - Complex'
    }
  ]


  const menuItems: WidgetPropertyMenuItem[] = [
    {
      itemType: 'dropdown',
      propertyName: 'priority',
      tooltip: 'Priority',
      selectedOption: priority,
      options: priorityOptions,
    },
    {
      itemType: 'separator'
    },
    {
      itemType: 'dropdown',
      propertyName: 'complexity',
      tooltip: 'Complexity',
      selectedOption: complexity,
      options: complexityOptions,
    },
    {
      itemType: 'separator'
    },
    {
      itemType: 'dropdown',
      propertyName: 'progression',
      tooltip: 'Progression',
      selectedOption: progression,
      options: progressionOptions,
    },
    {
      itemType: 'separator'
    },
  ]

  //type PropertyValue = 'to discuss' | 'to do' | 'in progress' | 'done' | 'cancelled' |'MUST' | 'SHOULD' | 'COULD'| 'WON\'T'

  type ProgressionValue = 'to discuss' | 'to do' | 'in progress' | 'done' | 'cancelled'

  const handlePropertyChange = ({ propertyName, propertyValue }: WidgetPropertyEvent) => {
    if (!propertyValue) return

    if (propertyName === 'priority') {
      setPriority(propertyValue)
    }
    else if (propertyName === 'complexity') {
      setComplexity(propertyValue)
    }
    else if (propertyName === 'progression') {
      setProgression(propertyValue)

      const progressionColors = {
        'to discuss': todiscussColor,
        'to do': todoColor,
        'in progress': inprogressColor,
        'done': doneColor,
        'cancelled': cancelledColor,
      }
      
      setProgressionColor(progressionColors[propertyValue as ProgressionValue])
      
    }

  }

  usePropertyMenu(menuItems, handlePropertyChange)

  /// POPIN ///

  // type Link = {
  //   label: string,
  //   link: string
  // }

  const [details, setDetails] = useSyncedState<string>('details', '')
  const [links, setLinks] = useSyncedState('links', {})

  const openDetails = () => {
    figma.showUI(__html__, { width: 400, height: 200, title: 'Story details' })

    figma.ui.postMessage({ details, links })

    figma.ui.onmessage = pluginMessage => {
      setDetails(pluginMessage.details.value)
      setLinks(pluginMessage.links)
    }
    //figma.closePlugin();
  }

  // LE TABLEAU N'EST PAS MIS A JOUR

  const linksJSX = Object.entries(links).map(([key, value]) =>{
    console.log('key ', key)
    console.log('value ', value)
    return (
      <AutoLayout
          key={key}
          name='link'
          verticalAlignItems={'center'}
          cornerRadius={4}
          padding={{
            top: 4,
            left: 8,
            bottom: 4,
            right: 10
          }}
          stroke={black100}
          strokeWidth={1}
          hoverStyle={{
            fill: black10,
          }}
          spacing={4}
          onClick={() =>
            new Promise(() => {

              // GERER L'URL
              console.log('click')
              // figma.showUI(openLinkHTML)
              figma.showUI(__html__)
              // figma.openLink.postMessage({url: value.link})
              // figma.ui.postMessage({url: value.link });

            })
          }
        >
          <SVG
            src={linkIcon}
          />
          <Text fontFamily="Inter" fontSize={14} fontWeight={400} lineHeight={24}>{value.label}</Text>
        </AutoLayout>
    )
  })

  return (
    <AutoLayout
      name='body'
      verticalAlignItems={'center'}
      spacing={24}
      padding={{
        top: 12,
        left: 12,
        bottom: 16,
        right: 12
      }}
      fill={progressionColor}
      stroke={black100}
      strokeWidth={2}
      direction="vertical"
      effect={{
        type: 'drop-shadow',
        color: black80,
        offset: {
          x: 8,
          y: 8,
        },
        blur: 0,

      }}
      width={320}
      opacity={cardOpacity}
      cornerRadius={8}

    >

      <AutoLayout
        name='top container'
        verticalAlignItems={'center'}
        spacing={'auto'}
        width={'fill-parent'}
      >
        <AutoLayout
          name='around priorirty & complexity'
          verticalAlignItems={'center'}
          spacing={4}
        >
          <AutoLayout
            name='around priority'
            verticalAlignItems={'center'}
            cornerRadius={2}
            padding={4}
            // hoverStyle={{
            //   fill: black10,
            // }}
          >
            {priorityIcons(priority)}
          </AutoLayout>
          <AutoLayout
            name='around complexity'
            verticalAlignItems={'center'}
            cornerRadius={2}
            padding={4}
            // hoverStyle={{
            //   fill: black10,
            // }}
          >
            <AutoLayout
              name='complexity'
              verticalAlignItems={'center'}
              horizontalAlignItems={'center'}
              fill={black100}
              cornerRadius={2}
              width={32}
              height={24}
            >
              <Text fontFamily="Inter" fontSize={20} fontWeight={600} lineHeight={24} fill={progressionColor}>{complexity}</Text>
            </AutoLayout>
          </AutoLayout>
        </AutoLayout>
        <AutoLayout
          name='around progression'
          verticalAlignItems={'center'}
          cornerRadius={2}
          padding={4}
          // hoverStyle={{
          //   fill: black10,
          // }}
        >
          <Text fontFamily="Inter" fontSize={22} fontWeight={600} lineHeight={24}>{progression.toUpperCase()}</Text>
        </AutoLayout>
      </AutoLayout>
      <Input
        value={userstory}
        placeholder="As a user I want to..."
        placeholderProps={{
          fill: black100,
          opacity: 0.5
        }}
        onTextEditEnd={(e) => {
          setUserstory(e.characters)
        }}
        fontSize={16}
        width={'fill-parent'}
        inputBehavior="wrap"
        lineHeight={24}
        textDecoration={text_decoration}
        inputFrameProps={
          {
            padding: {
              left: 4,
              right: 4
            }
          }
        }
      />
      <AutoLayout
        name='buttons'
        verticalAlignItems={'center'}
        width='fill-parent'
        height='hug-contents'
        wrap={true}
        padding={{
          top: 0,
          left: 4,
          bottom: 0,
          right: 4
        }}
        spacing={8}
      >

        {details !== '' &&
        <AutoLayout
          name='add detail button'
          verticalAlignItems={'center'}
          cornerRadius={4}
          padding={{
            top: 4,
            left: 8,
            bottom: 4,
            right: 10
          }}
          stroke={black100}
          strokeWidth={1}
          hoverStyle={{
            fill: black10,
          }}
          spacing={4}
          onClick={() =>
            new Promise(() => {

              openDetails()

            })
          }
        >
          <SVG
            src={detailsIcon}
          />
          <Text fontFamily="Inter" fontSize={14} fontWeight={400} lineHeight={24}>details</Text>
        </AutoLayout>}
        {linksJSX}
        <AutoLayout
          name='add detail button'
          verticalAlignItems={'center'}
          cornerRadius={4}
          padding={{
            top: 6,
            left: 6,
            bottom: 6,
            right: 6
          }}
          stroke={black100}
          strokeWidth={1}
          hoverStyle={{
            fill: black10,
          }}
          spacing={4}
          onClick={() =>
            new Promise(() => {

              openDetails()

            })
          }
        >
          <SVG
            src={addIcon}
          />
        </AutoLayout>

      </AutoLayout>
  </AutoLayout>
  )

}

widget.register(Widget)


