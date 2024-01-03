const { widget } = figma
const { useSyncedState, usePropertyMenu, AutoLayout, Text, SVG, Input, useWidgetId } = widget

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

    /// USERSTORY ///
    const [userstory, setUserstory] = useSyncedState('userstory', '')

    /// PROGRESSION ///
    const [progression, setProgression] = useSyncedState('progression', 'to discuss')
    const progressionOptions = [
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

    const text_decoration = progression === 'cancelled' ? 'strikethrough': 'none'

    const cardOpacity = progression === 'cancelled' ? 0.7 : 1


    /// PRIORITY ///
    const [priority, setPriority] = useSyncedState('priority', 'WON\'T')
    const priorityOptions = [
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

    const priorityIcons = (priority: string) => {

        const opacities = {
            'MUST': [1,1,1],
            'SHOULD': [1,1,0.08],
            'COULD': [1,0.08,0.08],
            'WON\'T': [0.08,0.08,0.08],
        }

        return (
            <AutoLayout verticalAlignItems={'center'}>
                {
                    opacities[priority].map((opacity, index) => (
                        <Text key={index} fontFamily="Inter" fontSize={24} opacity={opacity} lineHeight={24}>♥</Text>
                    ))
                }
            </AutoLayout>
        )}

    /// COMPLEXITY ///
    const [complexity, setComplexity] = useSyncedState('complexity', 'S')
    const complexityOptions = [
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


    const menuItems = [
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

    const handlePropertyChange = ({propertyName , propertyValue}) => {
        if (propertyName === 'priority') {
            setPriority(propertyValue)
        }
        else if(propertyName === 'complexity') {
            setComplexity(propertyValue)
        }
        else if (propertyName === 'progression') {
            setProgression(propertyValue)
            if (propertyValue === 'to discuss') setProgressionColor(todiscussColor)
            if (propertyValue === 'to do') setProgressionColor(todoColor)
            if (propertyValue === 'in progress') setProgressionColor(inprogressColor)
            if (propertyValue === 'done') setProgressionColor(doneColor)
            if (propertyValue === 'cancelled') setProgressionColor(cancelledColor)

        }

    }

    usePropertyMenu(menuItems, handlePropertyChange)

    /// POPIN ///

    const [details, setDetails] =useSyncedState<string>('details', '')

    const openDetails = () => {
        console.log('state ', details)
        figma.showUI(__html__, { width: 400, height: 200, title: 'Story details' })
    
        figma.ui.postMessage({ details })
    
        figma.ui.onmessage = pluginMessage => {
            setDetails(pluginMessage.details)
        }
    //figma.closePlugin();
    }

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
                    {padding:{
                        left: 4,
                        right: 4
                    }}
                }
            />
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
                    src={addIcon}
                />
                <Text fontFamily="Inter" fontSize={14} fontWeight={400} lineHeight={24}>add details</Text>
            </AutoLayout>
        </AutoLayout>
    )

}

widget.register(Widget)


